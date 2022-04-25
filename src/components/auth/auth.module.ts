import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/user';
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {JwtAccessStrategy} from "./strategies/jwt-access.strategy";

@Module({
  controllers: [AuthController],
  imports: [PassportModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), JwtModule.register({})],
  providers: [LocalStrategy, JwtAccessStrategy, AuthService],
  exports: [JwtAccessStrategy],
})
export class AuthModule { }
