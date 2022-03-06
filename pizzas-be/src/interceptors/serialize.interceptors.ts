import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";

interface ClassConstructor {
  new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor{
  constructor( private dto: any ){}
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    //Code before request is handled
    return next.handle().pipe(
      map((data:any) => {
        //Code before request response
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        })

      })
    )
  }

}