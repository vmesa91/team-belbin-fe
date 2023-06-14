
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: '1'
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: '2'
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: '3'
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: '4'
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: '5'
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export function CustomRating({ onChange, defaultValue }) {
  return (
    <StyledRating
      IconContainerComponent={IconContainer}
      getLabelText={(value) => customIcons[value].label}
      highlightSelectedOnly
      onChange={onChange}
      size="large"
      defaultValue={defaultValue} 
    />
  );
}