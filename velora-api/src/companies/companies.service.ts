import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  private companies: Company[] = [];
  private nextId = 1;

  create(createCompanyDto: CreateCompanyDto): Company {
    const now = new Date();

    const company: Company = {
      id: this.nextId++,
      ...createCompanyDto,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };

    this.companies.push(company);

    return company;
  }

  findAll(): Company[] {
    return this.companies;
  }

  findOne(id: number): Company {
    const company = this.companies.find((item) => item.id === id);

    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return company;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto): Company {
    const company = this.findOne(id);

    Object.assign(company, updateCompanyDto, {
      updatedAt: new Date(),
    });

    return company;
  }

  remove(id: number): Company {
    const company = this.findOne(id);

    this.companies = this.companies.filter((item) => item.id !== id);

    return company;
  }
}