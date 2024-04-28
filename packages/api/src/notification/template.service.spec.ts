import { Test, TestingModule } from '@nestjs/testing';
import { TemplateService } from './template.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TemplateService', () => {
  let service: TemplateService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateService, PrismaService],
    }).compile();
    service = module.get<TemplateService>(TemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('template', () => {
    it('extract variable from template', async () => {
      expect(
        service.extractVariablesFromTemplate(
          'Hello: {{name}}. My name is {{name2}}.',
        ),
      ).toEqual(['name', 'name2']);
      expect(
        service.extractVariablesFromTemplate(
          'Hello: {{name}}. My name is {{name2}}. Yours {{name}}',
        ),
      ).toEqual(['name', 'name2']);
    });

    it('check template and variable valid', async () => {
      expect(
        service.checkTemplateMatchedVariables('My name is Terminus.', []),
      ).toEqual(true);
      expect(
        service.checkTemplateMatchedVariables(
          'Hello: {{name}}. My name is {{name2}}.',
          ['name', 'name2'],
        ),
      ).toEqual(true);
      expect(
        service.checkTemplateMatchedVariables(
          'Hello: {{name}}. My name is {{name2}}.',
          ['name'],
        ),
      ).toEqual(false);
      expect(
        service.checkTemplateMatchedVariables(
          'Hello: {{name}}. My name is {{name2}}.',
          ['name1', 'name2'],
        ),
      ).toEqual(false);
      expect(
        service.checkTemplateMatchedVariables(
          'Hello: {{name}}. My name is {{name2}}. Yours {{name}}',
          ['name', 'name2'],
        ),
      ).toEqual(true);
    });

    it('replace template basic', async () => {
      expect(
        service.replaceTemplateWithVariables(
          'Hello: {{name}}. My name is {{name2}}.',
          { name: 'John Doe', name2: 'Peng' },
        ),
      ).toEqual('Hello: John Doe. My name is Peng.');

      expect(
        service.replaceTemplateWithVariables(
          'Hello: {{name}}. My name is {{name2}}. Yours {{name}}',
          { name: 'John Doe', name2: 'Peng' },
        ),
      ).toEqual('Hello: John Doe. My name is Peng. Yours John Doe');
    });
  });
});
