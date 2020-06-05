import knex from "knex";
import path from "path";

const connection = knex({
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "database.sqlite"),
  },
  useNullAsDefault: true,
});

export default connection;

//__dirname: variavel globa, retorna o diretorio do arquivo que esta executando a variavel
// Migrations = Histórico do banco de dados
