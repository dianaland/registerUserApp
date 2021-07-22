import * as React from "react";
import './Card.css';

interface OwnProps {
}

const Card: React.FunctionComponent<OwnProps> = ({children}) => {
  return (
      <div className={"Card-root"}>
          {children}
      </div>
    );
};

export default (Card);
