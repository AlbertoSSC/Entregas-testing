import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

import {
  mapEmployeeSummaryFromApiToVm,
  mapEmployeeSummaryListFromApiToVm,
  mapProjectFromApiToVm,
} from './project.mapper';

import { mockEmployeeSummaryList, mockProject } from './api/project.mock-data';

describe('Project Mapper', () => {
  it('should map an EmployeeSummary from API to VM correctly', () => {
    // Arrange
    const employeeSummary: apiModel.EmployeeSummary = {
      id: '1',
      employeeName: 'Daniel Perez',
      isAssigned: true,
    };

    const expectedResult: viewModel.EmployeeSummary = {
      id: '1',
      employeeName: 'Daniel Perez',
      isAssigned: true,
    };

    // Act
    const result = mapEmployeeSummaryFromApiToVm(employeeSummary);

    // Assert
    expect(result).toEqual(expectedResult); // Verifica que el resultado sea igual al objeto original
  });

  it('should map a list of EmployeeSummary from API to VM correctly', () => {
    // Arrange
    const employeeSummaryList: apiModel.EmployeeSummary[] =
      mockEmployeeSummaryList;

    const expectedResult: viewModel.EmployeeSummary[] = [
      {
        id: '1',
        employeeName: 'Daniel Perez',
        isAssigned: true,
      },
      {
        id: '2',
        employeeName: 'Jose Sanchez',
        isAssigned: false,
      },
      {
        id: '3',
        employeeName: 'Javier Benitez',
        isAssigned: false,
      },
      {
        id: '4',
        employeeName: 'María Peña',
        isAssigned: true,
      },
    ];

    // Act
    const result = mapEmployeeSummaryListFromApiToVm(employeeSummaryList);

    // Assert
    expect(result.length).toEqual(employeeSummaryList.length);

    employeeSummaryList.forEach((original, index) => {
      expect(result[index]).toEqual(mapEmployeeSummaryFromApiToVm(original));
    });

    expect(result).toEqual(expectedResult);
  });

  it('should map a Project from API to VM correctly', () => {
    //Arrange
    const project: apiModel.Project = mockProject;

    const expectedResult: viewModel.Project = {
      id: '1',
      name: 'Nombre',
      isActive: true,
      comments: 'Comentario',
      externalId: '1234',
      employees: [
        {
          id: '1',
          employeeName: 'Daniel Perez',
          isAssigned: true,
        },
        {
          id: '2',
          employeeName: 'Jose Sanchez',
          isAssigned: false,
        },
        {
          id: '3',
          employeeName: 'Javier Benitez',
          isAssigned: false,
        },
        {
          id: '4',
          employeeName: 'María Peña',
          isAssigned: true,
        },
      ],
    };

    //Act
    const result = mapProjectFromApiToVm(project);

    //Assert
    expect(result).toEqual(expectedResult);

  });

  it.each<apiModel.Project | undefined | null | {}>([undefined, null, {}])(
    'should return empty project VM when it feeds project equals %p',
    (project: any) => {
      //Arrange

      //Act
      const result: viewModel.Project = mapProjectFromApiToVm(project);

      //Assert
      expect(result).toEqual(viewModel.createEmptyProject());
    }
  );
});
