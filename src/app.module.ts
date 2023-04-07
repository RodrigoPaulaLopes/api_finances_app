import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { InvoicesModule } from './invoices/invoices.module';
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersEntity } from './users/users.entity';
import { Invoices } from './invoices/invoices.entity';
import { AuthMiddleware } from './auth/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/Jwtonstants';

@Module({
  imports: [
    UsersModule,
    InvoicesModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "financesapp",
      entities: [UsersEntity, Invoices],
      synchronize: true,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '5h' },
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('invoices');
  }
}
