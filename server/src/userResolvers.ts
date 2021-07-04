import {Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver} from "type-graphql";
import {hash, compare} from "bcryptjs";
import { User } from "./entity/User";
import { MyContext } from "MyContext";
import { createAccessToken, createRefreshToken } from "../auth";

@ObjectType()
class LoginResponse{
    @Field()
    accessToken: string
}


@Resolver()
export class UserResolvers {
    @Query(()=>String)
    hello () {
        return "hi form UserResolvers";
    }

    @Query(()=>[User])
    users () {
        return User.find();
    }

    @Mutation(()=>Boolean)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string,
    ){
        try{
            const hashPassword=await hash(password, 12);
            await User.insert({
                email,
                password: hashPassword,
            })
        }catch(error){
            console.log(error);
            return false;
        }
        return true;
    }

    @Mutation(()=>LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() {res}:MyContext,
    ) : Promise<LoginResponse>{
        // try{
            const user=await User.findOne({where: {email}});
            if(!user){
                throw new Error("Could not find user");
            }
            console.log(user)
            const validPassword=await compare(password, user.password);
            console.log(validPassword);
            if(!validPassword){
                throw new Error("bad password");
            }
            res.cookie("jid", createAccessToken(user),{
                    httpOnly: true,
            });
            return {
                accessToken: createRefreshToken(user),
            };
    }
}

