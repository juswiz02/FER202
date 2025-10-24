import  Button from "react-bootstrap/Button";

function MyFooter() {
  return (
    <footer>
      <p>Author: TrongHT</p>
      <p>Created by: tronghtde170732@fpt.edu.vn </p>
      <p>&copy; {new Date().getFullYear()} TrongHT. All rights reserved </p>
      <Button variant="link" href="" >My Link Github's project: Movies Management </Button>
    </footer>
  )
}
export default MyFooter;