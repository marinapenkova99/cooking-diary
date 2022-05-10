import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function NextArrow(props) {
  const { onClick } = props;
  return (
    <FontAwesomeIcon
      icon={faAngleRight}
      className={"next_arrow"}
      onClick={onClick}
    />
  );
}

export function PrevArrow(props) {
  const { onClick } = props;
  return (
    <FontAwesomeIcon
      icon={faAngleLeft}
      className={"prev_arrow"}
      onClick={onClick}
    />
  );
}
