import './index.scss';

function BasicLayout(props) {
  console.debug(props.location);
  return (
    <div className="BasicLayout">
      {props.children}
    </div>
  );
}

export default BasicLayout;
