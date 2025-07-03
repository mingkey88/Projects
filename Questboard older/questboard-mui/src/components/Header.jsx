import { Box, InputBase, IconButton, Button, Typography, Paper, styled, Avatar } from '@mui/material';
import { Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';

const SearchWrapper = styled(Paper)(({ theme }) => ({
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1]
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
}));

const Header = ({ onFilterClick }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      mb: 3,
      width: '100%'
    }}>
      {/* Left side - Title and Search */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" sx={{ mr: 4, fontWeight: 'bold' }}>
          QuestBoard
        </Typography>
        <SearchWrapper sx={{ width: 350 }}>
          <IconButton sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <StyledInputBase
            placeholder="Search quests, categories..."
            inputProps={{ 'aria-label': 'search quests' }}
          />
        </SearchWrapper>
      </Box>
      
      {/* Right side - Filter button and profile avatar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 'auto' }}>
        <Button 
          variant="contained" 
          startIcon={<FilterListIcon />}
          onClick={onFilterClick}
          size="small"
          sx={{ 
            borderRadius: 4, 
            textTransform: 'none', 
            px: 2,
            backgroundColor: 'background.paper',
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'background.paper',
              opacity: 0.9
            }
          }}
        >
          Filter
        </Button>
        <Avatar 
          src="https://cdn.midjourney.com/b2263cde-ed7e-454b-a529-9ca52d62c2f8/0_1.png" 
          alt="User"
          sx={{ width: 40, height: 40 }}
        />
      </Box>
    </Box>
  );
};

export default Header;
