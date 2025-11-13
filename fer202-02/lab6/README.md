# Lab 6: TÌM HIỂU VỀ REDUX, REDUX THUNK VÀ REDUX TOOLKIT

## 1. Redux Thunk là gì? Giải thích vai trò của nó trong việc xử lý các tác vụ bất đồng bộ (ví dụ: gọi API). Tại sao không thể thực hiện trực tiếp trong Reducer?

Redux Thunk là một middleware cho Redux, cho phép viết action creators trả về một hàm thay vì một action object. Hàm này có thể thực hiện các tác vụ bất đồng bộ và dispatch các action khi hoàn thành.

Vai trò trong xử lý bất đồng bộ: Thunk cho phép delay dispatch của action, thực hiện logic bất đồng bộ (như gọi API), và dispatch action với kết quả khi xong. Ví dụ, trong action creator, có thể return một hàm nhận dispatch và getState, trong đó gọi API, rồi dispatch action success hoặc error.

Tại sao không thể trực tiếp trong Reducer: Reducer phải là pure functions, chỉ nhận state và action, trả về state mới. Chúng không được thực hiện side effects như gọi API. Thunk cho phép xử lý side effects trong action creators.

## 2. Kể tên và giải thích ngắn gọn 3 ưu điểm chính của Redux Toolkit (RTK) so với việc sử dụng Redux thuần (Vanilla Redux)

1. **Giảm boilerplate code**: RTK cung cấp createSlice để tự động tạo actions và reducers, giảm code so với viết action types, action creators, và reducers thủ công.

2. **Immutability và performance**: RTK sử dụng Immer để viết "mutating" code nhưng thực tế immutable, và có built-in performance optimizations.

3. **Tích hợp tốt hơn**: Bao gồm Redux Thunk mặc định, và khuyến khích best practices như cấu trúc slice-based.

## 3. Trong Redux Toolkit, giải thích sự khác biệt giữa createSlice và createReducer. Tại sao createSlice được khuyến khích sử dụng hơn?

createSlice tạo cả actions và reducer từ một object, tự động tạo action creators và action types. createReducer chỉ tạo reducer từ một object với case reducers.

createSlice được khuyến khích vì nó tự động tạo actions, giảm boilerplate, và khuyến khích tổ chức code theo slice.

## 4. Async Thunk cho Payments

```javascript
import { createAsyncThunk } from '@reduxjs/toolkit';

export const refundPayment = createAsyncThunk(
  'payments/refund',
  async (transactionId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/payments/${transactionId}/refund`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Refund failed');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

3 trạng thái:
- pending: Action dispatched, đang xử lý.
- fulfilled: Thành công, payload là kết quả.
- rejected: Lỗi, payload là error từ rejectWithValue.

## 5. User State Initialization

```javascript
import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  // reducers...
});

export default usersSlice.reducer;
```

## 6. Vận dụng

### Bài tập 1: Quản Lý Người Dùng (Users)

#### usersSlice.js

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/users');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    toggleAdminStatus: (state, action) => {
      const user = state.list.find(u => u.id === action.payload);
      if (user) user.isAdmin = !user.isAdmin;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleAdminStatus } = usersSlice.actions;
export default usersSlice.reducer;
```

### Bài tập 2: Quản Lý Thanh Toán (Payments)

#### paymentsSlice.js

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/payments', paymentData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 402) {
        return rejectWithValue('Tài khoản không đủ tiền');
      }
      return rejectWithValue(error.message);
    }
  }
);

const paymentsSlice = createSlice({
  name: 'payments',
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectSuccessfulPayments = (state) =>
  state.payments.list.filter(payment => payment.status === 'SUCCESS');

export default paymentsSlice.reducer;
```

## 7. Nâng cao: Áp dụng Redux Toolkit trong bài quản lý users/payments ở bài tập Progress test 2

Trong pt-fer202-2, thay thế Context bằng Redux Toolkit. Tạo store với configureStore, thêm slices cho users và payments, và sử dụng useSelector/useDispatch trong components.
