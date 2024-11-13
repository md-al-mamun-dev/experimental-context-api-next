// class EventEmitter {
//     constructor() {
//       this.events = new WeakMap();
//     }
  
//     on(event, listener) {
//       if (!this.events.has(event)) {
//         this.events.set(event, []);
//       }
//       this.events.get(event).push(listener);
//     }
  
//     off(event, listener) {
//       if (!this.events.has(event)) return;
//       const listeners = this.events.get(event);
//       this.events.set(event, listeners.filter(l => l !== listener));
//     }
  
//     emit(event, ...args) {
//       if (!this.events.has(event)) return;
//       this.events.get(event).forEach(listener => listener(...args));
//     }
//   }
class EventEmitter {
    constructor() {
      this.events = {};
    }
  
    on(event, listener) {
      if (!this.events[event]) this.events[event] = [];
      this.events[event].push(listener);
    }
  
    off(event, listener) {
      if (!this.events[event]) return;
      this.events[event] = this.events[event].filter(l => l !== listener);
    }
  
    emit(event, ...args) {
      if (!this.events[event]) return;
      this.events[event].forEach(listener => listener(...args));
    }
  }

export default EventEmitter