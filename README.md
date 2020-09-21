# Configurable-authorization-and-menu-navigation-in-NODE-JS

## Introduction

This project is aimed to develop a solution to make the user navigation menu be more flexible and configurable. With this approach, we can achieve the following results:

- The user navigation menu is decoupled from the functionality implementation
- The user navigation menu order and structure can be changed easily without changing any implementation code
- The user navigation menu item will be changed based on the user roles which have different access privileges.

## Design

To achieve the goals mentioned above, the application needs to have the ability to load the user menu dynamically based on user roles, the menu items should be configurable easily and the re-configured menu must be loaded automatically by the application.

There are usually 2 most popular approaches for the application configuration: store the configuration in a properties file or store the configuration in a database.  For a distributed system, storing configuration in a properties file has the disadvantages of copying the same configuration file all over the different nodes and clusters for each change. Furthermore, managing relationship in a properties file is much more difficult and challengeable. Because of this, I choose to use the database as configuration.

## Database

The database used in this project is MongoDB, but any database can be used. The tables that are stored in the database are listed as follows:

1. User: used to store the information of all users who have access to the application
2. AppRole: used to store all roles in the application. There will be 2 roles in the demo: Business Admin and Viewer
3. AppResource: used to store application resources which can be accessible to users
4. AppRoleResource: used to map what application resources can be accessed by which role
5. menuitems: used to store all individual menu items for navigation
6. menus: used to store a tree of menus for navigation
7. AppConfig: used to store all app configurations, fur the purpose of this project, AppConfig only has one element, which is an element which states that a user wants to be automatically logged in
8. Organization: used as a sample table for CRUD operations
9. Program: used as a sample table for CRUD operations

To see the detailed data structure for all of the tables, go to /app/backend/models

## Implementation

This project make use of Node JS and React JS to implement this design. React is used to create UI components. Axios is used to communicate between React frontend application and NodeJS Backend application. The NodeJS Backend uses express for all its functionality and is structured in a three layered architecture for ease of use. To authenticate users, the passport module is used. Currently, the method of authentication is dynamically injected, so depending on how the user wants to be authenticated, there is a channel for that in the same route. The currently enabled forms of authentication are local, google, and facebook, but other such as twitter can easily be added.

When the user created an account via the user registrations system, they are able to give themselves a role. This is implemented this way to facilitate testing. In a real world scenario, the user would be given a general role, and the System Admin would have to change the role as required. After registering, the user is able to log into the system and authenticate themselves. Immediately upon authentication, the users role is extracted from the user JSON and is processed. Taking the role into account, the backend does a search of the AppRoleResource table and returns a list of all Resources that the users role is able to access. This list is then stored in the request header. Until the user logs out or their roles are updated, the user will only be allowed to access resources that are in the list of allowed roles stored in the request header.

Below is the main code that gives the user a role. Roles are given to a user during the user registration process and are saved in the User table in MongoDB under the sysRole array. What this code does is extract this role, and depending on the role, allow the user to access various pages of the app. The pages that a user is able to access is dictated by the RoleResource Table in MongoDB. There, each role is mapped to the resources that it can access.
```
getRoles = user => {
    return new Promise(async (resolve, reject) => {
      let data = [];
      for (const sysRole of user.sysRole) {
        if (sysRole.role !== 'Business Admin') {
          const roleResouce = await this.AppRoleResourceRepository.findByAppRoleId(sysRole.AppRoleId);
          for (const id of roleResouce.resourceId) {
            const resourcesData = await this.AppResourceRepository.findById(id);
            data.push(resourcesData);
          }
        }
        resolve(data);
      }
    });
  };
```
This code is located in the following path. /app/backend/src/services/Auth/service.js

Note how the method is not directly pulling from the database, as the backend is designed in a three-layer architecture. This means that the method will call the repository, which will then use the model to pull from the database.
