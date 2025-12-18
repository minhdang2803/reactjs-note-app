// useForm.ts
import { useState, useCallback } from 'react';
import type { ValidatorRule } from './FormValidation';


// Định nghĩa Schema: Key của form map với mảng các Rule
type ValidationSchema<T> = {
  [K in keyof T]?: ValidatorRule[];
};

export function useForm<T extends Record<string, any>>(
  initialValues: T, 
  schema: ValidationSchema<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  // Hàm validate một field cụ thể
  const validateField = useCallback((name: keyof T, value: any, currentValues: T) => {
    const rules = schema[name];
    if (rules) {
      for (const rule of rules) {
        // Truyền value và cả object currentValues để phục vụ rule isConfirmed
        const errorMessage = rule(value, currentValues); 
        if (errorMessage) {
          return errorMessage;
        }
      }
    }
    return undefined;
  }, [schema]);

  // Xử lý sự kiện thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    // Xử lý logic cho checkbox/radio nếu cần (ở đây làm đơn giản cho text)
    const finalValue = type === 'checkbox' ? checked : value;

    setValues((prev) => ({ ...prev, [name]: finalValue }));

    // UX: Xóa lỗi ngay khi người dùng bắt đầu sửa lại
    if (errors[name as keyof T]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Xử lý sự kiện Blur (người dùng rời khỏi ô input -> mới Validate)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof T, value, values);
    
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  // Xử lý Submit Form
  const handleSubmit = (onSubmit: (values: T) => void) => {
    return (e: React.FormEvent) => {
      e.preventDefault();
      
      const newErrors: Partial<Record<keyof T, string>> = {};
      let isValid = true;

      // Validate toàn bộ form
      (Object.keys(schema) as Array<keyof T>).forEach((key) => {
        const error = validateField(key, values[key], values);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      });

      setErrors(newErrors);

      if (isValid) {
        onSubmit(values);
      }
    };
  };

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}