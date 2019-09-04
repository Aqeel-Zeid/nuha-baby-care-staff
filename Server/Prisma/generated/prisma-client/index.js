"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Department",
    embedded: false
  },
  {
    name: "Position",
    embedded: false
  },
  {
    name: "Staff",
    embedded: false
  },
  {
    name: "CardTemplate",
    embedded: false
  },
  {
    name: "PhotoFrameTemplate",
    embedded: false
  },
  {
    name: "Item",
    embedded: false
  },
  {
    name: "LeaveDay",
    embedded: false
  },
  {
    name: "EventPackage",
    embedded: false
  },
  {
    name: "Customer",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://nuhaprismadb-e9e96b51e5.herokuapp.com/nuha-graphql/dev`
});
exports.prisma = new exports.Prisma();
