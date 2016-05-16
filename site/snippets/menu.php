<div id="navbar" class="collapse navbar-collapse">
  <ul class="nav navbar-nav navbar-right">
    <!-- SHOW VISIBLE PAGES -->
	<?php foreach($pages->visible() as $p): ?>
        <li>
          <a <?php e($p->isOpen(), ' class="active"') ?> href="<?php echo $p->url() ?>"><?php echo $p->title()->html() ?></a>
        </li>
    <?php endforeach ?>
	
	<!-- ACCOUNT NAME / LOGOUT -->
	<?php if($user = $site->user()): ?>
		<li>
		  <a href="<?php echo url('account') ?>"><?php echo $user?></a>
		</li>
	<?php else: ?>
		<li>
		  <a href="<?php echo url('login') ?>">Login</a>
		</li>
	<?php endif; ?>
	</li>
  </ul>
</div>
