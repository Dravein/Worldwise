import { useNavigate } from "react-router-dom";
import Button from "./Button";

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        //Submit alap even megakadályozása
        e.preventDefault();
        //Vissza tudunk lépni vele az előző oldalra
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
