import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';



function Media() {
  return (
    <Card sx={{ m: 2 ,my:4 ,borderRadius:4 }}>
      <CardHeader
        avatar={
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
        }
        title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
        }
        subheader={
            <Skeleton animation="wave" height={10} width="40%" />
        }
      />
      <CardContent>
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
      </CardContent>
      <Skeleton sx={{ height: 400 }} animation="wave" variant="rectangular" />
    </Card>
  );
}

export default function SkeltonePost({count=3}:{count?:number}) {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <Media key={index} />
      ))}
    </>
  );
}
