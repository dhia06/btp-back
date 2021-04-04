import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact.entity';
import { ContactService } from './contact.service';
import { ContactsController } from './contacts.controller';

@Module({imports:[
    TypeOrmModule.forFeature([Contact]),
   ],
  controllers: [ContactsController],
  providers: [ContactService],
})
export class ContactsModule {}
