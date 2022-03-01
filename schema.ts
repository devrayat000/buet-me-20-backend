/*
Welcome to the schema! The schema is the heart of Keystone.

Here we define our 'lists', which will then be used both for the GraphQL
API definition, our database tables, and our Admin UI layout.

Some quick definitions to help out:
A list: A definition of a collection of fields with a name. For the starter
  we have `User`, `Post`, and `Tag` lists.
A field: The individual bits of data on your list, each with its own type.
  you can see some of the lists in what we use below.

*/

// Like the `config` function we use in keystone.ts, we use functions
// for putting in our config so we get useful errors. With typescript,
// we get these even before code runs.
import { list } from "@keystone-6/core";

// We're using some common fields in the starter. Check out https://keystonejs.com/docs/apis/fields#fields-api
// for the full list of fields.
import {
  text,
  password,
  timestamp,
  select,
  image,
} from "@keystone-6/core/fields";
// The document field is a more complicated field, so it's in its own package
// Keystone aims to have all the base field types, but you can make your own
// custom ones.

// We are using Typescript, and we want our types experience to be as strict as it can be.
// By providing the Keystone generated `Lists` type to our lists object, we refine
// our types to a stricter subset that is type-aware of other lists in our schema
// that Typescript cannot easily infer.
import { Lists } from ".keystone/types";
import { isAdmin, isAdminOrModerator, isAdminOrPerson } from "./hooks/admin";

// We have a users list, a blogs list, and tags for blog posts, so they can be filtered.
// Each property on the exported object will become the name of a list (a.k.a. the `listKey`),
// with the value being the definition of the list, including the fields.
export const lists: Lists = {
  // Here we define the user list.
  User: list({
    access: {
      operation: {
        create: isAdmin,
        delete: isAdmin,
        // update: isAdminOrModerator,
      },
      item: {
        update: isAdminOrPerson,
      },
    },
    // Here are the fields that `User` will have. We want an email and password so they can log in
    // a name so we can refer to them, and a way to connect users to posts.
    fields: {
      name: text({
        access: {
          update: isAdminOrPerson,
          read: isAdminOrModerator,
        },
        validation: { isRequired: true },
      }),
      email: text({
        access: {
          update: isAdminOrPerson,
          read: isAdminOrModerator,
        },
        validation: { isRequired: true },
        isIndexed: "unique",
        isFilterable: true,
      }),
      // The password field takes care of hiding details and hashing values
      password: password({
        access: {
          update: isAdminOrPerson,
          read: isAdmin,
        },
        validation: { isRequired: true },
      }),
      role: select({
        access: {
          update: isAdmin,
          read: isAdminOrModerator,
        },
        type: "enum",
        options: [
          {
            label: "Admin",
            value: "admin",
          },
          {
            label: "Moderator",
            value: "moderator",
          },
        ],
      }),
      // Relationships allow us to reference other lists. In this case,
      // we want a user to have many posts, and we are saying that the user
      // should be referencable by the 'author' field of posts.
      // Make sure you read the docs to understand how they work: https://keystonejs.com/docs/guides/relationships#understanding-relationships
      // posts: relationship({ ref: "Post.author", many: true }),
    },
    // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
    ui: {
      listView: {
        initialColumns: ["name", "email", "role"],
      },
    },
  }),
  Todo: list({
    fields: {
      type: select({
        type: "enum",
        options: [
          {
            label: "CT",
            value: "ct",
          },
          {
            label: "Lab Report",
            value: "lab",
          },
        ],
      }),
      subject: text({ validation: { isRequired: true } }),
      about: text({ validation: { isRequired: true } }),
      due: timestamp(),
    },
  }),
  Announcement: list({
    fields: {
      title: text({ validation: { isRequired: true } }),
      created: timestamp({ defaultValue: { kind: "now" } }),
    },
    ui: {
      listView: {
        initialColumns: ["title"],
      },
    },
  }),
  Student: list({
    fields: {
      studentId: text({
        validation: {
          isRequired: true,
          length: { max: 7, min: 7 },
          match: {
            regex: /2010(?<roll>[0][0-9][0-9]|[1][0-7][0-9]|[1][8][0])/,
          },
        },
        isIndexed: "unique",
      }),
      email: text({
        validation: {
          isRequired: true,
          match: {
            regex:
              /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
          },
        },
        isIndexed: "unique",
      }),
      name: text({
        validation: {
          isRequired: true,
          length: { min: 5 },
        },
      }),
      phone: text({
        isIndexed: "unique",
        validation: {
          isRequired: true,
          length: { min: 11, max: 11 },
          match: { regex: /01\d{9}/ },
        },
      }),
      photo: image(),
      facebook: text({
        db: { isNullable: true },
      }),
    },
  }),
};
