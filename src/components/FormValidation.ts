// validatorRules.ts

// Định nghĩa kiểu dữ liệu cho hàm test: nhận vào value hiện tại và toàn bộ formValues (để so sánh)
export type ValidatorRule = (value: any, formValues: any) => string | undefined;

export const Rules = {
  // 1. Bắt buộc nhập
  isRequired: (message: string = 'Please provide this input field'): ValidatorRule => {
    return (value) => (value ? undefined : message);
  },

  // 2. Kiểm tra Email
  isEmail: (message: string = 'This field must be email'): ValidatorRule => {
    return (value) => {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : message;
    };
  },

  // 3. Độ dài tối thiểu
  minLength: (min: number, message?: string): ValidatorRule => {
    return (value) => {
      return value && value.length >= min 
        ? undefined 
        : message || `It shuould be at least ${min} characters`;
    };
  },

  // 4. Kiểm tra mật khẩu mạnh (Username/Password check cũ của bạn)
  passwordCheck: (): ValidatorRule => {
    return (value) => {
        if (value.toLowerCase() === "password") return "Password must not be 'password'";
        // Bạn có thể thêm các regex phức tạp hơn ở đây nếu cần
        return undefined;
    }
  },

  // 5. Xác nhận giá trị (So sánh password và confirmPassword)
  isConfirmed: (confirmFieldName: string, message: string = 'Input value is not correct'): ValidatorRule => {
    return (value, formValues) => {
      return value === formValues[confirmFieldName] ? undefined : message;
    };
  }
};