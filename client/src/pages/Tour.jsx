import React from "react";
import { useQuery, gql } from '@apollo/client';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const GET_EVENTS = gql`
  query GetEvents {
    events {
      _id
      description
      date
      location
      venue
      ticket
    }
  }
`;

const GeneralContainer = styled('div')({
  marginTop: '7rem',
});

const StyledTableContainer = styled(TableContainer)({
  margin: "auto",
  maxWidth: "65%",
  overflowX: "auto",
  marginBottom: "40px",
  border: "1px solid white",
  boxShadow: '0px 0px 20px 10px #447AC2ff',
  '@media (max-width: 768px)': {
    maxWidth: "80%", // For medium screens
  },
  '@media (max-width: 480px)': {
    maxWidth: "100%", // For small screens
  },
});

const StyledTable = styled(Table)({
  minWidth: 300,
  border: "2px solid white"
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#241742ff',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#447AC2ff',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#DA1279ff',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Tour() {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <GeneralContainer>
      <StyledTableContainer component={Paper}>
        <StyledTable aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Location</StyledTableCell>
              <StyledTableCell align="right">Venue</StyledTableCell>
              <StyledTableCell align="right">Tickets</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.events.map((event) => (
              <StyledTableRow key={event._id}>
                <StyledTableCell component="th" scope="row">
                  {event.description}
                </StyledTableCell>
                <StyledTableCell align="right">{event.date}</StyledTableCell>
                <StyledTableCell align="right">{event.location}</StyledTableCell>
                <StyledTableCell align="right">{event.venue}</StyledTableCell>
                <StyledTableCell align="right">
                  <a href={event.ticket} target="_blank" rel="noopener noreferrer">
                    <Button variant="contained" style={{ backgroundColor: '#241742ff', color: 'white' }}>
                      Get Tickets
                    </Button>
                  </a>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </GeneralContainer>
  );
}
