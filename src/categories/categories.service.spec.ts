import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';


describe('CategoriesService', () => {
  let categoriesSrv: CategoriesService;

  beforeEach(async () => {

    const fakeCategoryRepository = {
      find: () => Promise.resolve([]),
      create: jest.fn().mockImplementation((dto) => {
        return {
          id: Math.floor(Math.random()*(1000-1)+1),
          ...dto
        }
      }),
      save: jest.fn().mockImplementation((newCategory) => {
        return Promise.resolve({
          // id: Math.random()*(1000-1)+1,
          ...newCategory,
        })
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: fakeCategoryRepository
        }
      ],
    }).compile();

    categoriesSrv = module.get<CategoriesService>(CategoriesService);
  });

  it('Should be defined', () => {
    expect(categoriesSrv).toBeDefined();
  });

  it('Should create a Category', async() => {
    const createCategoryDto = {
      name: 'Category Test',
      description: 'Category Description',
      image: 'Image Test url',
    }

    expect( await categoriesSrv.create(createCategoryDto)).toEqual({
      id: expect.any(Number),
      ...createCategoryDto,
    })
  });

});

