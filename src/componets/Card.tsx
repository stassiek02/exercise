type CardProps = {
  name: string;
  height: string;
};
export const Card = ({ height, name }: CardProps) => (
  <li className={`card`}>
    <div className="card-body">{height}</div>
    <div className={"card-footer"}>{name}</div>
  </li>
);
