import createContextApi from "./lib/query/createContextApi"

const taskContext = createContextApi({
                        slicename:'task',
                        baseQuery: 'https://localhost/3000/',
                        endpoints: (queries) => ({
                                        // createTask: queries.post({
                                        //     query: ()=> '/products'
                                        // }),
                                        readTask: queries.get({
                                            query: (id)=> `/task/${id}`
                                        }),
                                        // readTasks: queries.get({
                                        //     query: ()=> '/products'
                                        // }),
                                        // updateTasks: queries.put({
                                        //     query: (id)=> `/quiz/${id}`
                                        // }),
                                        // updateTask: queries.patch({
                                        //     query: (id)=> `/quiz/${id}`
                                        // }),
                                        // deleteTask: queries.delete({
                                        //     query: (id)=> `/quiz/${id}`
                                        // })
                        })
                    })
export const { 
                TaskProvider, 
                useTaskData, 
                useTaskDispatch,
                // useCreateTask,
                useReadTask,
                // useReadTasks,
                // useUpdateTasks,
                // useUpdateTask,
                // useDeleteTask
            } = taskContext
