import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreatePacienteService } from '../services/CreatePacienteService';
import { ShowOnePacienteService } from '../services/ShowOnePacienteService';

class PacienteController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showPaciente = container.resolve(ShowOnePacienteService);

    const paciente = await showPaciente.execute(Number(id));

    return res.json(paciente);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      RG,
      email,
      id_hospital,
      leito,
      nascimento,
      nome,
      sexo,
      telefone,
    } = req.body;

    const createPaciente = container.resolve(CreatePacienteService);

    const paciente = await createPaciente.execute({
      RG,
      email,
      id_hospital,
      leito,
      nascimento,
      nome,
      sexo,
      telefone,
    });

    return res.json(paciente);
  }
}

export { PacienteController };