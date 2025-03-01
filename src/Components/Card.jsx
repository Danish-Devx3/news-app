import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function ActionAreaCard(props) {
  return (
    <Card sx={{ 
      maxWidth: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.2s",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: 3
      }
    }}>
      <CardActionArea sx={{ height: "100%" }}>
        <CardMedia
          component="img"
          height="200"
          image={props.image || 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={props.title}
          sx={{
            objectFit: "cover"
          }}
        />
        <CardContent>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="div"
            sx={{
              fontWeight: "bold",
              lineHeight: 1.4
            }}
          >
            {props.title}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical"
            }}
          >
            {props.content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
