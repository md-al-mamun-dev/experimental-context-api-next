import EventEmitter from "./EventEmitter";

class DataCache extends EventEmitter {
  constructor(defaultValidityTime = '30m') {
    super();
    this.cache = {};
    this.inProgressFetches = {};
    this.defaultValidityTime = defaultValidityTime;
  }

  generateCacheKey(cacheName, queryParams) {
    const queryString = new URLSearchParams(queryParams).toString();
    return `${cacheName}?${queryString}`;
  }

  async getData(cacheName, url, queryParams = {}) {
    const cacheKey = this.generateCacheKey(cacheName, queryParams);

    if (this.inProgressFetches[cacheKey]) return this.cache[cacheKey]?.data || [];

    if (this.cache[cacheKey] && this.isCacheValid(cacheKey)) {
      return this.cache[cacheKey].data;
    }

    this.inProgressFetches[cacheKey] = true;

    try {
      const response = await fetch(url);
      const result = await response.json();

      this.cache[cacheKey] = {
        data: result,
        dateTime: Date.now(),
        validityDuration: this.toMilliseconds(this.defaultValidityTime),
      };
      this.emit('dataUpdate', { key: cacheKey });
    } catch (error) {
      this.cache[cacheKey] = { error: error.message };
      this.emit('dataError', { key: cacheKey, message: error.message });
    } finally {
      delete this.inProgressFetches[cacheKey];
    }

    return this.cache[cacheKey]?.data || [];
  }

  async postData(cacheName, url, queryParams = {}, newData) {
    const cacheKey = this.generateCacheKey(cacheName, queryParams);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      const result = await response.json();

      this.cache[cacheKey] = {
        data: result,
        dateTime: Date.now(),
        validityDuration: this.toMilliseconds(this.defaultValidityTime),
      };
      this.emit('dataUpdate', { key: cacheKey });
    } catch (error) {
      this.emit('dataError', { key: cacheKey, message: error.message });
    }
  }

  async putData(cacheName, url, queryParams = {}, updatedData) {
    const cacheKey = this.generateCacheKey(cacheName, queryParams);
    const previousData = this.cache[cacheKey]?.data || null;
    this.cache[cacheKey] = { ...this.cache[cacheKey], data: updatedData };
    this.emit('dataUpdate', { key: cacheKey, optimistic: true });

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const result = await response.json();
      this.cache[cacheKey].data = result;
      this.cache[cacheKey].dateTime = Date.now();
      this.emit('dataUpdate', { key: cacheKey });
    } catch (error) {
      this.cache[cacheKey].data = previousData;
      this.emit('dataError', { key: cacheKey, message: error.message });
    }
  }
  
  async patchData(cacheName, url, queryParams = {}, updatedData) {
    const cacheKey = this.generateCacheKey(cacheName, queryParams);
    const previousData = this.cache[cacheKey]?.data || null;

    // Optimistically update cache
    this.cache[cacheKey] = { ...this.cache[cacheKey], data: { ...previousData, ...updatedData } };
    this.emit('dataUpdate', { key: cacheKey, optimistic: true });

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const result = await response.json();

      this.cache[cacheKey].data = result;
      this.cache[cacheKey].dateTime = Date.now();
      this.emit('dataUpdate', { key: cacheKey });
    } catch (error) {
      // Revert optimistic update on error
      this.cache[cacheKey].data = previousData;
      this.emit('dataError', { key: cacheKey, message: error.message });
    }
  }

  async deleteData(cacheName, url, queryParams = {}) {
    const cacheKey = this.generateCacheKey(cacheName, queryParams);
    const previousData = this.cache[cacheKey]?.data || null;
    delete this.cache[cacheKey];
    this.emit('dataUpdate', { key: cacheKey, deleted: true });

    try {
      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');
      delete this.cache[cacheKey];
      this.emit('dataUpdate', { key: cacheKey, deleted: true });
    } catch (error) {
      if (previousData) {
        this.cache[cacheKey] = { data: previousData, dateTime: Date.now() };
      }
      this.emit('dataError', { key: cacheKey, message: error.message });
    }
  }

  isCacheValid(key) {
    const item = this.cache[key];
    return item && (Date.now() - item.dateTime) <= item.validityDuration;
  }

  toMilliseconds(value, unit = "minutes") {
    const valueString = String(value).toLowerCase();
    const regex = /^(\d*\.?\d+)\s*(m|minute|minutes|h|hour|hours)?$/;
    const match = valueString.match(regex);

    if (!match) {
      throw new Error("Invalid format. Please enter a valid number with optional units (e.g., '10', '10m', '5.3hours').");
    }

    const numericValue = parseFloat(match[1]);
    const valueUnit = match[2] || unit.toLowerCase();

    if (["m", "minute", "minutes"].includes(valueUnit)) {
      return numericValue * 60 * 1000;
    } else if (["h", "hour", "hours"].includes(valueUnit)) {
      return numericValue * 60 * 60 * 1000;
    } else {
      throw new Error("Invalid unit. Please use 'minute', 'minutes', 'm', 'hour', 'hours', or 'h'.");
    }
  }
}

export default DataCache