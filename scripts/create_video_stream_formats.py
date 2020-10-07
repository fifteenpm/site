import sys
import ffmpeg_streaming
from ffmpeg_streaming import Formats

input_path = sys.argv[1]
video = ffmpeg_streaming.input(input_path)

# from ffmpeg_streaming import Formats

# dash = video.dash(Formats.h264())
# dash.auto_generate_representations()
# dash.output('/var/media/dash.mpd')




hls = video.hls(Formats.h264())
hls.auto_generate_representations()
# hls.output('/var/media/hls.m3u8')


from ffmpeg_streaming import  S3, CloudManager

s3 = S3(aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY, region_name='us-east-1')
save_to_s3 = CloudManager().add(s3, bucket_name="fifteen.pm")


hsl.output(clouds=save_to_s3)
dash.output(clouds=save_to_s3)

#https://docs.videojs.com/docs/guides/setup.html
# https://jsfiddle.net/vm4detdy/ 
"""
https://stackoverflow.com/questions/49781878/python-flask-ffmpeg-video-streaming-video-does-not-work-in-firefox
The solution was actually pretty simple, you gotta re-encode the stream with vcodec libvpx-vp9 or vp8 and acoded libopus or libvorbis

The ffmpeg for python syntax would look like this:

self.args = ffmpeg.output(self.args, "-",
                              f="webm",
                              vcodec="libvpx-vp9",
                              acodec="loboupus",
                              blocksize="1024",
                              # strftime="1",
                              # segment_time="60",
                              # segment_format="matroska"
                              preset="ultrafast",
                              metadata="title='test'"
                              )

"""


# THIS ONE WORKS BUT FILES SIZE NEEDS TO BE REDUCED...: https://gist.github.com/lukebussey/4d27678c72580aeb660c19a6fb73e9ee

"""
# Two strategies so far

just running
```
ffmpeg -i ~/Desktop/the-end-vid.mp4 -codec: copy -start_number 0 -hls_time .01 -hls_list_size 0 -f hls filename.m3u8
```

also tried pre-rendering video:

```
ffmpeg -i ~/Desktop/the-end-vid.mp4 -c:v libx264 \
-r 24 -x264opts keyint=24:min-keyint=24 -crf 19 \
~/Desktop/the-end-vid-r24.mp4
```

and then running that into previous command which is currently what devving with


this error related to ffmpeg conversion:


VIDEOJS: ERROR: (CODE:-3 undefined) The quota has been exceeded. 
{…}
​
code: -3
​
message: "The quota has been exceeded."
​
originalError: DOMException: The quota has been exceeded.
​
type: "APPEND_BUFFER_ERR"
​
<prototype>: Object { code: 0, MEDIA_ERR_CUSTOM: 0, MEDIA_ERR_ABORTED: 1, … }

was fixed by setting 

```
videojs.Hls.MAX_GOAL_BUFFER_LENGTH = 30;
```

but that seems like sweeping the problem under the rug, which is that i think the ffmpeg chunk sizes are too big



TODO
- lower ffmpeg chunk sizes and see it work deployed to dev
- user interaction bug - need to get video playing only after hasEntered
- 
"""
