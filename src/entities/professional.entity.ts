import { UserRoleEnum } from "src/enums/user-role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Contact } from "./contact.entity";
import { UserEntity } from "./user.entity";
@Entity()
export class Professional  extends UserEntity  {
    
  
    
    @Column()
    registration : number;

  
    
  }