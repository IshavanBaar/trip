<?php snippet('header') ?>

<div class="container" role="main">
	<div class="row">
		<div class="col-md-2">
			<!-- LOGIN TITLE -->
			<h2><?php echo $page->title()->html() ?></h2>
			
			<!-- ERROR MESSAGE -->
			<?php if($error): ?>
				<div class="alert"><?php echo $page->alert()->html() ?></div>
			<?php endif ?>
			<!-- TODO styling of the form -->
			<form method="post">
				<div>
					<label for="username"><?php echo $page->username()->html() ?></label>
					<input type="text" id="username" name="username">
				</div>
				<div>
					<label for="password"><?php echo $page->password()->html() ?></label>
					<input type="password" id="password" name="password">
				</div>
				<div>      
					<input type="submit" name="login" value="<?php echo $page->button()->html() ?>">
				</div>
			</form>
		</div>
	</div>
</div>

<?php snippet('footer') ?>
