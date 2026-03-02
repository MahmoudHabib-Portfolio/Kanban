import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* fetchTasks via Redux AsyncThunk */
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
    const res = await fetch("http://localhost:4000/tasks");
    const data = await res.json();
    return data;
});

/* add_Tasks */
export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
    const res = await fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task),
    });

    return res.json();
});

/* update_Tasks */
export const updateTasks = createAsyncThunk("tasks/editTask", async({ id, title, description, priority, column }) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description,
            priority, 
            column
        }),
    });

    return res.json();
});

/* remove_Tasks */
export const remvTask = createAsyncThunk("tasks/removeTasks", async(id) => {
    await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'DELETE',
    });
    return id;
});

/* create redux container slice */
const taskReducer = createSlice({
    name: "tasks",
    initialState: {
        loading: false,
        tasks: [],
        error: ''
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload
        });
        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        });
        builder.addCase(addTask.fulfilled, (state, action) => {
            state.tasks.push(action.payload);
        });
        builder.addCase(updateTasks.fulfilled, (state, action) => {
            const index = state.tasks.findIndex(x => x.id === action.payload.id)
            state.tasks[index] = action.payload
        });
        builder.addCase(remvTask.fulfilled, (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload)
        });
    }
});

export default taskReducer.reducer;