import sys
import ffmpeg_streaming

input_path = sys.argv[1]
video = ffmpeg_streaming.input(input_path)

from ffmpeg_streaming import Formats

dash = video.dash(Formats.h264())
dash.auto_generate_representations()
# dash.output('/var/media/dash.mpd')


from ffmpeg_streaming import Formats

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
