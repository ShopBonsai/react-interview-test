const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { merchants, users } = require("../../../mockMerchantData.json");

const { JWT_SECRET } = require("../../constants");

const resolvers = {
  Query: {
    merchants: () => merchants,
    user: (_, __, { userId }) => {
      return users.find((u) => u.userId === userId);
    },
  },

  Mutation: {
    login: async (_, { username, password }) => {
      const user = users.find((u) => u.username === username);

      if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (isValidPassword) {
          return {
            token: jwt.sign({ userId: user.userId }, JWT_SECRET),
          };
        }
      }

      throw new Error("Invalid Username or Password.");
    },

    signup: async (_, { username, password, confirmPassword }) => {
      const user = users.find((u) => u.username === username);

      if (user) {
        throw new Error("Username already taken.");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      // should use actual id generation
      // this will be a problem when a user changes their username and another user
      // creates an account with the old/no longer existing name
      const newUser = {
        userId: username,
        username,
        password: await bcrypt.hash(password, 10),
      };

      fs.writeFileSync(
        "mockMerchantData.json",
        JSON.stringify(
          {
            users: [...users, newUser],
            merchants,
          },
          null,
          2
        )
      );

      return {
        token: jwt.sign({ userId: newUser.userId }, JWT_SECRET),
      };
    },
  },
};

module.exports = resolvers;
