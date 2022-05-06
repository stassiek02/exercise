type CardProps = {
  name: string;
  height: number;
};
export const Card = ({ height, name }: CardProps) => (
  <li className={`card`}>
    <div className={"card-body"}>{height}</div>
    <div className={"card-footer"}>{name}</div>
  </li>
);
