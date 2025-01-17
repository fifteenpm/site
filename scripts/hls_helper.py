# the default params for this lib output hls that didn't work in safari or firefox - file corruption err in video.js
"""
examples.hls
~~~~~~~~~~~~

Create HlS streams


:copyright: (c) 2020 by Amin Yazdanpanah.
:website: https://www.aminyazdanpanah.com
:email: contact@aminyazdanpanah.com
:license: MIT, see LICENSE for more details.
[Source: https://github.com/aminyazdanpanah/python-ffmpeg-video-streaming/commit/1f173ae6766fd6ff89b8bef82cc096539a4f7aa5]
"""

import argparse
import datetime
import sys
import logging

import ffmpeg_streaming
from ffmpeg_streaming import Formats

logging.basicConfig(filename='streaming.log', level=logging.NOTSET, format='[%(asctime)s] %(levelname)s: %(message)s')


def monitor(ffmpeg, duration, time_, time_left, process):
    """
       Handling proccess.

       Examples:
       1. Logging or printing ffmpeg command
       logging.info(ffmpeg) or print(ffmpeg)

       2. Handling Process object
       if "something happened":
           process.terminate()

       3. Email someone to inform about the time of finishing process
       if time_left > 3600 and not already_send:  # if it takes more than one hour and you have not emailed them already
           ready_time = time_left + time.time()
           Email.send(
               email='someone@somedomain.com',
               subject='Your video will be ready by %s' % datetime.timedelta(seconds=ready_time),
               message='Your video takes more than %s hour(s) ...' % round(time_left / 3600)
           )
          already_send = True

       4. Create a socket connection and show a progress bar(or other parameters) to your users
       Socket.broadcast(
           address=127.0.0.1
           port=5050
           data={
               percentage = per,
               time_left = datetime.timedelta(seconds=int(time_left))
           }
       )

       :param ffmpeg: ffmpeg command line
       :param duration: duration of the video
       :param time_: current time of transcoded video
       :param time_left: seconds left to finish the video process
       :param process: subprocess object
       :return: None
       """
    per = round(time_ / duration * 100)
    sys.stdout.write(
        "\rTranscoding...(%s%%) %s left [%s%s]" %
        (per, datetime.timedelta(seconds=int(time_left)), '#' * per, '-' * (100 - per))
    )
    sys.stdout.flush()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('-i', '--input', required=True, help='The path to the video file (required).')
    parser.add_argument('-o', '--output', default=None, help='The output to write files.')

    parser.add_argument('-fmp4', '--fragmented', default=False, help='Fragmented mp4 output')

    parser.add_argument('-k', '--key', default=None, help='The full pathname of the file where a random key will be '
                                                          'created (required). Note: The path of the key should be '
                                                          'accessible from your website(e.g. '
                                                          '"/var/www/public_html/keys/enc.key")')
    parser.add_argument('-u', '--url', default=None, help='A URL (or a path) to access the key on your website ('
                                                          'required)')
    parser.add_argument('-krp', '--key_rotation_period', default=0, help='Use a different key for each set of '
                                                                         'segments, rotating to a new key after this '
                                                                         'many segments.')

    args = parser.parse_args()

    video = ffmpeg_streaming.input(args.input)

    hls = video.hls(Formats.h264())
    hls.auto_generate_representations()

    if args.fragmented:
        hls.fragmented_mp4()

    if args.key is not None and args.url is not None:
        hls.encryption(args.key, args.url, args.key_rotation_period)

    hls.output(args.output, monitor=monitor)


if __name__ == "__main__":
    sys.exit(main())
