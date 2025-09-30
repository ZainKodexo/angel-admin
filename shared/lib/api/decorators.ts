import { ApiException, ApiResponse } from '@/shared/types';

type MethodDecorator = <T extends object>(
  target: T,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<any>,
) => TypedPropertyDescriptor<any> | void;

function withErrorHandling(): MethodDecorator {
  return function (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ): TypedPropertyDescriptor<any> {
    console.log(target, propertyKey, descriptor);
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      ...args: any[]
    ): Promise<ApiResponse<any>> {
      try {
        const ty = await originalMethod.apply(this, args);
        return ty;
      } catch (error) {
        if (error instanceof ApiException) {
          return {
            success: false,
            message: error.error.message,
            status: error.status,
            data: null,
          };
        }
        return {
          success: false,
          message: 'An unexpected error occurred',
          status: 500,
          data: null,
        };
      }
    };

    return descriptor;
  };
}

export { withErrorHandling };
