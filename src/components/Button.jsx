import PropTypes from 'prop-types';
import clsx from 'clsx';

const Button = ({ 
  id = '', 
  title, 
  rightIcon = null, 
  leftIcon = null, 
  containerClass = '' 
}) => {
  return (
    <button
      id={id}
      className={clsx(
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 py-3 text-black bg-violet-50", containerClass
      )}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>
      {rightIcon}
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  rightIcon: PropTypes.element,
  leftIcon: PropTypes.element,
  containerClass: PropTypes.string
};

export default Button;