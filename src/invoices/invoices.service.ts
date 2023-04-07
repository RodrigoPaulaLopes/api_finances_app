import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoices } from './invoices.entity';

@Injectable()
export class InvoicesService {

    constructor(@InjectRepository(Invoices) private invoicesRepository: Repository<Invoices>) { }

    public async findAll(id) {
        try {
            const invoices = await this.invoicesRepository.find({ where: { user: { id: id } } })

            return invoices
        } catch (error) {
            return error
        }
    }

    public async findById(id, userId) {
        try {
            const invoice = await this.invoicesRepository.findOne({ where: { id: id, user: {id: userId} } })

            return invoice
        } catch (error) {
            return error
        }
    }

    public async insertInvoice(invoices) {
        try {
            const current_date = new Date()
            const date_invoice = new Date(invoices.due_date)

            const status = current_date <= date_invoice ? "a pagar" : "atrasada"
            
            const newInvoice: Invoices = {
                title: invoices.title,
                value: invoices.value,
                due_date: date_invoice,
                payment_date: null,
                status: status,
                user: invoices.user

            }

            const adding = await this.invoicesRepository.save(newInvoice)

            return adding
        } catch (error) {
            return error
        }
    }

    public updateInvoice() {
        return "update invoices"
    }

    public deleteInvoice() {
        return "delete invoice"
    }
}
