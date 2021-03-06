import { inject, injectable } from 'tsyringe';
import AppError from '../../../errors/AppError';
import { Hospital } from '../entities/Hospital';
import { IHospitalRepository } from '../repositories/IHospitalRepository';

interface IRequest {
  cnpj: string;
  nome: string;
  telefone: string;
  cep: string;
  endereco: string;
  email: string;
}

@injectable()
class CreateHospitalService {
  constructor(
    @inject('HospitalRepository')
    private hospitalRepository: IHospitalRepository,
  ) {}

  public async execute(data: IRequest): Promise<Hospital> {
    const { cnpj, cep, nome, telefone, email, endereco } = data;

    const exists = await this.hospitalRepository.findByCNPJ(cnpj);

    if (exists) {
      throw new AppError('CNPJ already registered');
    }

    const hospital = await this.hospitalRepository.create({
      cep,
      cnpj,
      email,
      endereco,
      nome,
      telefone,
    });

    return hospital;
  }
}

export { CreateHospitalService };
