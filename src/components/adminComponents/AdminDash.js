import React,{useEffect} from "react";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {useDispatch, useSelector} from "react-redux"
import { Stores } from "../../actions/storesAction";
import {logout} from "../../actions/adminAction"


const AdminDash = ({history}) => {

    const dispatch = useDispatch();
    const stores = useSelector((state) => state.stores);
    const { loading, error, storesList } = stores;

    const adminLogin = useSelector((state) => state.adminLogin);
    const { adminInfo } = adminLogin;
  
    const logoutHandler = () => {
      dispatch(logout());
      history.push("/admin")
    };

    useEffect(() => {
        dispatch(Stores());
      }, []);








    const columns = [
        { id: 'store', label: 'STORE NAME', minWidth: 170 },
        { id: 'category', label: 'STORE CATEGORY', minWidth: 100 },
        {
          id: 'sellerName',
          label: 'SELLER NAME',
          minWidth: 170,
          align: 'right',
        },
        {
          id: 'dateOfOpening',
          label: 'DATE OF OPENING',
          minWidth: 170,
          align: 'right',
        },
   
      ];
     
      
      const rows = storesList   

    const useStyles = makeStyles({
        root: {
          width: '100%',
        },
        container: {
          maxHeight: 440,
        },
      });


    const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  return (
    <div className="container-fluid col-12 d-flex justify-content-center align-items-center ">
      <div className="col-2 bg-bg-white adminSidebar d-flex flex-column  align-items-center">
        <div className="px-5 py-5 ">
          <img src="/pictures/adminlogo.png" />
        </div>
        <div className="">
          <h6 className="">Dashboard</h6>
        </div>
      </div>
      <div className="col-10 bg-bg-gradient adminDashboard">
        <div className="col-12 d-flex justify-content-between px-2 py-2 align-self-center">
          <div className="">
            <h3 className="fw-bold" style={{fontFamily:"fantasy"}}>Dashboard</h3>
            <li style={{fontSize:"12px"}}>Check your analytic</li>
          </div>
          <div className="d-flex">
          <div className=" d-flex align-self-center ">
            <div className="">
              <PersonOutlineOutlinedIcon />
            </div>
            <h6 className="mx-2 fw-bold" style={{textTransform:"capitalize"}}>{adminInfo.name}</h6>
          </div>
          <div className="dropdown_option d-flex align-items-center " onClick={logoutHandler}>
                     <ExitToAppOutlinedIcon/>
                     <h6 className="mx-2 fw-bold" style={{textTransform:"capitalize"}}>Logout</h6>
          </div>
          </div>
        </div>
        <div className="mx-5 my-5">
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                          style={{textTransform:"capitalize"}}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
