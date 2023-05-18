from imaginairy import (
    imagine,
    imagine_image_files,
    ImaginePrompt,
    WeightedPrompt,
    LazyLoadingImage,
)


def generate(style, inputFilename, outFilename):
    prompts = []
    if style == "anime":
        prompts = [
            ImaginePrompt(
                "make it anime",
                #prompt="A handsome gentleman Prince Charming. The background is a castle. wearing a suit.",
                #negative_prompt="Creepy, sad, weird eyes, weird face, wrong proportion",
                #fix_faces=True,
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                # model="openjourney-v4",
                model="SD-2.0-depth",
                steps=20,
                #init_image_strength=0.6,
            )
        ]
    elif style == "3d":
        prompts = [
            ImaginePrompt(
                "make it cute pixar style",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                model="openjourney-v4",
                # fix_faces=True,
                init_image_strength=0.4,
                prompt_strength=20,
                steps=20,
            )
        ]
    elif style == "pixel":
        prompts = [
            ImaginePrompt(
                # "pixel, 8-bit color",
                prompt="A handsome gentleman Prince Charming. The background is a castle. wearing a suit.",
                negative_prompt="Creepy, sad, weird eyes, weird face, wrong proportion",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                # control_image=LazyLoadingImage(filepath="./" + inputFilename),
                # control_mode="hed",
                # model="openjourney-v4",
                # model="SD-2.0-depth",
                # model="edit",
                # model="oj1",
                # init_image_strength=0.6,
                # prompt_strength=20,
                # steps=20,
                fix_faces=True,
                # init_image=LazyLoadingImage(filepath="./" + inputFilename),
                # model="openjourney-v4",
                model="SD-2.1",
                steps=30,
                init_image_strength=0.6,
            )
        ]
    elif style == "smile":
        prompts = [
            ImaginePrompt(
                "a couple smiling",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                mask_prompt="face",
                mask_mode="replace",
                init_image_strength=0.2,
                steps=20,
                fix_faces=True,
            )
        ]
    elif style == "old":
        prompts = [
            ImaginePrompt(
                "make the person older",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                mask_prompt="head|face",
                mask_mode="replace",
                model="edit",
                init_image_strength=0.2,
                steps=20,
            )
        ]
    elif style == "young":
        prompts = [
            ImaginePrompt(
                "make the person younger",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                mask_prompt="head|face",
                mask_mode="replace",
                model="edit",
                init_image_strength=0.2,
                prompt_strength=15,
                steps=20,
            )
        ]
    elif style == "high-res":
        from imaginairy.enhancers.upscale_realesrgan import upscale_image
        from imaginairy.enhancers.face_restoration_codeformer import enhance_faces
        img = LazyLoadingImage(filepath="./" + inputFilename)
        img = upscale_image(img)
        img = enhance_faces(img, fidelity=1)
        img.save(f"./frontend/public/img/{style}/{outFilename}")
    elif style == "extend":
        prompts = [
            ImaginePrompt(
                "nsfw, person standing",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                outpaint="all250,up100,down300",
                init_image_strength=0,
                upscale=True,
                steps=20,
            )
        ]
    elif style == "bg-beach":
        prompts = [
            ImaginePrompt(
                "make it near beach",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                init_image_strength=0.1,
                model="edit",
                mask_prompt="face|body|head|clothes",
                mask_mode="keep",
                steps=20,
            )
        ]
    elif style == "firework":
        prompts = [
            ImaginePrompt(
                "make many firework fill all on the background",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                init_image_strength=0.1,
                # prompt_strength=12,
                # model="edit",
                model="openjourney-v4",
                mask_prompt="face|body|head|clothes|neck|skin|person{+1}",
                mask_mode="keep",
                steps=20,
            )
        ]
    elif style == "hair-color":
        prompts = [
            ImaginePrompt(
                "change the hair to pink",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                # init_image_strength=0.1,
                prompt_strength=15,
                model="edit",
                mask_prompt="hair{+30}",
                mask_mode="replace",
                steps=20,
            )
        ]
    elif style == "christmas":
        prompts = [
            ImaginePrompt(
                "make it christmas",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                # init_image_strength=0.1,
                prompt_strength=15,
                model="edit",
                mask_prompt="face",
                mask_mode="keep",
                steps=20,
            )
        ]
    elif style == "halloween":
        prompts = [
            ImaginePrompt(
                "make it halloween",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                # init_image_strength=0.1,
                prompt_strength=15,
                model="edit",
                mask_prompt="face|head|body|clothes",
                mask_mode="replace",
                steps=20,
            )
        ]
    elif style == "robot":
        prompts = [
            ImaginePrompt(
                "turn the humans into a robot",
                # "make the person a doctor",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                # init_image_strength=0.5,
                # prompt_strength=13,
                model="edit",
                # mask_prompt="face|head|body|clothes",
                # mask_mode="replace",
                steps=20,
            )
        ]
    elif style == "doctor":
        prompts = [
            ImaginePrompt(
                "make the person a doctor",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                # init_image_strength=0.5,
                prompt_strength=13,
                model="edit",
                mask_prompt="face",
                mask_mode="keep",
                steps=20,
            )
        ]
    elif style == "firefighter":
        prompts = [
            ImaginePrompt(
                "make the person a firefighter",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                # init_image_strength=0.5,
                prompt_strength=13,
                model="SD-2.0-depth",
                mask_prompt="face",
                mask_mode="keep",
                steps=20,
            )
        ]
    elif style == "president":
        prompts = [
            ImaginePrompt(
                "make the person a president",
                init_image=LazyLoadingImage(filepath="./" + inputFilename),
                # init_image_strength=0.7,
                prompt_strength=13,
                model="SD-2.0-depth",
                mask_prompt="face|hair",
                mask_mode="keep",
                steps=20,
            )
        ]

    for result in imagine(prompts):
        result.save(f"./frontend/public/img/{style}/{outFilename}")
