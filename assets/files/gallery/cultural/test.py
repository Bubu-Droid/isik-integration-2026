#!/usr/bin/env python3

import os
from subprocess import Popen

for i in os.listdir():
    if i[-1] != "y":
        Popen(
            [
                "alacritty",
                "-e",
                "zsh",
                "-c",
                f"ffmpeg -i {i} {i.split('.')[0]}.webp",
            ],
        )
