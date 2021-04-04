//import { Controller } from '@nestjs/common';

import { ContactService } from './contact.service';
import { Controller, Get, Post,Put, Delete, Body, Param } from  '@nestjs/common';
import { Contact } from  '../entities/contact.entity';
import { promises } from 'fs';

@Controller('contact')
export class ContactsController {

    constructor(private contactService: ContactService){}
    @Get()
    read(): Promise<Contact[]> {
      console.log("dd")
      return this.contactService.readAll();
    }
    
    @Post('create')
    async create(@Body() contact: Contact): Promise<any> {
     // console.log('contacts:'+contact)
      return this.contactService.create(contact);
    
    }  
    
    @Put(':id/update')
    async update(@Param('id') id, @Body() contact: Contact): Promise<any> {
        contact.id = Number(id);
        return this.contactService.update(contact);
    }  
    
    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.contactService.delete(id);
    }
}                                                                                      

