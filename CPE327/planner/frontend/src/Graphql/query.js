import { gql } from "@apollo/client";

export const GET_USER_INFO = gql`
    query user($input: Int!)
    {
        user(id: $input){
            email
            firstName
            lastName
            job
            department
            organization
            address
            image
        }
    }
`;

export const GET_MY_PROJECT = gql`
    query findProjectByUser($input: Int!) 
    {
      findProjectByUser(id: $input) {
          project {
              projectId
              projectName
              projectStatus {
                  projectStatusId
              }
              description
              startDate
              dueDate
              completeDate
              task {
                  taskName
              }
          }
          user {
            firstName 
            lastName
          }
        }
      }
`;

export const GET_MY_TASK = gql`
  query tasks($input: Int!){
    userTasks(userId: $input) {
      taskId
      taskName
      startDate
      dueDate
      taskStatusId {
        taskStatusId
      }
      description
    }
  }
`;

export const GET_MY_TEAM = gql`
  query Partner($input: Int!){
    usersPartner(userId: $input) {
        userId
        firstName
        lastName
        image
        email
    }
  }
`;
