import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface ContainedButtonsProps {
    onClick: () => void
  }

const ContainedButtons: React.FC<ContainedButtonsProps> = ({onClick}) => {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={onClick}>
        Search
      </Button>
    </Stack>
  );
}


// interface ContainedButtonsProps {
//   onSearch: (datetime: Dayjs | null, location: string) => void;
//   }
  
// const ContainedButtons: React.FC<ContainedButtonsProps> = ({ onSearch }) => {
//   const [loading, setLoading] = useState(false);

//   const handleButtonClick = async () => {
//     setLoading(true);

//     // Simulate datetime and location selection (replace with actual values)
//     const datetime = null; // Replace with your datetime logic
//     const location = '14'; // Replace with your location logic

//     try {
//       const imageUrl = await fetchImageUrl(location)
//       console.log(`imageUrl:: ${imageUrl}`)
//       // Call the parent component's onSearch function to handle the data
//       onSearch(datetime, imageUrl);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Button variant="contained" onClick={handleButtonClick} disabled={loading}>
//         Search
//     </Button>
//   );
// };

export default ContainedButtons