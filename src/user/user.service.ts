import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
import { UserDto } from './dto/User.dto';

@Injectable()


export class UserService {
    constructor(
        @InjectRepository(UserEntity)    
        private readonly userRepo: Repository<UserEntity>, ) {}


        
        async findOne(options?: object): Promise<UserDto> {
            const user =  await this.userRepo.findOne(options);    
            return (user);  
        }
        async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {    
            const user = await this.userRepo.findOne({ where: { username } });
            
            if (!user) {
                throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
            }
            
            //compare passwords    
            const areEqual = await compare(user.password, password);
            console.log(user.password);
            console.log(password);
            console.log('===>',areEqual);
            if (!areEqual) {
                throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
            }
            
            return (user);  
        }
        
        async findByPayload({ username }: any): Promise<UserDto> {
            return await this.findOne({ 
                where:  { username } });  
        }
        async create(userDto: CreateUserDto): Promise<UserDto> {    
            const {phonenumber, username, password, email } = userDto;
            
            // check if the user exists in the db    
            const userInDb = await this.userRepo.findOne({ 
                where: { username } 
            });
            if (userInDb) {
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);    
            }
            
            const user: UserEntity = await this.userRepo.create({ username, password, email,phonenumber });
            await this.userRepo.save(user);
            return (user);  
        }
        
        
        




















}
