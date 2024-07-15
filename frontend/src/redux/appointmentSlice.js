// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const requestAppointment = createAsyncThunk(
  "user/requestAppointment",
  async (values, thunkAPI) => {
    try {
      console.log(values);
      // Your asynchronous logic to authenticate user here
      const response = await fetch(
        "http://localhost:8000/api/v1/appointment/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getAppointment = createAsyncThunk(
  "user/getAppointment",
  async (user_id, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/appointment/${user_id}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getAllAppointment = createAsyncThunk(
  "user/getAllAppointment",
  async (user_id, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/appointment/all/appointment`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  "user/deleteAppointment",
  async (appointment_id, thunkAPI) => {
    try {
      // Your asynchronous logic to delete student here
      const response = await fetch(
        `http://localhost:8000/api/v1/appointment/delete/${appointment_id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      return { appointmentId: appointment_id, message: data.message };
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const actionAppointment = createAsyncThunk(
  "user/actionAppointment",
  async ({id,action}, thunkAPI) => {
    try {
      // Your asynchronous logic to delete student here
      const response = await fetch(
        `http://localhost:8000/api/v1/appointment/action`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id,action}),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      return {apID:id , apAction:action, message: data.message };
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
const initialState = {
  appointment: null,
  allappointment: null,
  loading: false,
  error: null,
  message: null,
  formData:{}
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(requestAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      .addCase(getAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.appointment = action.payload.appointment;
      })
      .addCase(getAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      .addCase(getAllAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allappointment = action.payload.allappointment;
      })
      .addCase(getAllAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      .addCase(deleteAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        state.appointment = state.appointment.filter(
          (a) => a.appointment_id !== action.payload.appointmentId
        );
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(actionAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(actionAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        state.allappointment = state.allappointment.map((a) => {
          if (a.id === action.payload.apID) {
            return {
              ...a,
              status:action.payload.apAction  
            };
          } else {
            return a;
          }})
        })
      .addCase(actionAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { clearErrors, clearMessage , setFormData} = appointmentSlice.actions;

export default appointmentSlice.reducer;
