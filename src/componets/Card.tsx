type CardProps = {
  name: string;
  height: number;
};
export const Card = ({ height, name }: CardProps) => (
  <li className={`card`}>
    <div className={'card-body'}>
      {height}
      <span className={'card-span'}>cm</span>
    </div>
    <div className={'card-footer'}>{name}</div>
  </li>
);
