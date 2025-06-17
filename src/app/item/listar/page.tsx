"use client";

import api from "@/app/services/api";
import Itens from "@/app/types/itens";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

function ListarItens() {
  const [itens, setItens] = useState<Itens[]>([]);
  const [filtro, setFiltro] = useState<Itens[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    api
      .get<Itens[]>("/item/listar")
      .then((resposta) => {
        console.table(resposta.data);
        setItens(resposta.data);
        setFiltro(resposta.data); 
      })
      .catch((erro) => {
        console.error("Erro ao buscar itens:", erro);
      });
  }, []);

  function filtrar(texto: string) {
    const resultado = itens.filter((item) =>
      item.nome.toLowerCase().includes(texto.toLowerCase())
    );
    setFiltro(resultado);
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Listar Itens
      </Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Pesquisar Itens"
        type="text"
        onChange={(e) => filtrar(e.target.value)}
      />

      <TableContainer component={Paper} elevation={10}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Criado em</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtro
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.categoria}</TableCell>
                  <TableCell>
                    {new Date(item.criadoEm).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filtro.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Itens por página"
        />
      </TableContainer>
    </Container>
  );
}

export default ListarItens;