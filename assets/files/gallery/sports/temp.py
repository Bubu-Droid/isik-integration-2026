import os
import re
import subprocess

pattern = r"([a-zA-Z0-9_]+).(jpg)"

for i in os.listdir():
    if re.match(pattern, i):
        finalname = re.sub(
            pattern,
            lambda mo: f"{mo.group(1)}.{'webp'}",
            i,
        )

        subprocess.run(["ffmpeg", "-i", i, finalname])
